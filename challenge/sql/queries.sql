CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(50), apellido VARCHAR(50)
);

CREATE TABLE Ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY, fecha DATE, sucursal VARCHAR(50), numero_factura INT, importe DECIMAL(10, 2), id_cliente INT, FOREIGN KEY (id_cliente) REFERENCES clientes (id)
);

INSERT INTO
    clientes (nombre, apellido)
VALUES ('Juan', 'Pérez'),
    ('María', 'Gómez'),
    ('Carlos', 'López'),
    ('Laura', 'Martínez'),
    ('Roberto', 'Fernández');

INSERT INTO
    Ventas (
        fecha, sucursal, numero_factura, importe, id_cliente
    )
VALUES (
        '2024-02-06', 'Sucursal A', 1001, 15000.00, 1
    ),
    (
        '2024-02-06', 'Sucursal B', 1002, 20000.00, 2
    ),
    (
        '2024-02-06', 'Sucursal C', 1003, 70000.00, 3
    ),
    (
        '2024-02-06', 'Sucursal C', 1003, 20000.00, 3
    ),
    (
        '2024-02-06', 'Sucursal C', 1003, 11000.00, 3
    ),
    (
        '2024-02-06', 'Sucursal A', 1004, 18000.00, 4
    ),
    (
        '2024-02-06', 'Sucursal B', 1005, 25000.00, 5
    );

-- Consulta del ejercicio
SELECT c.id, c.nombre, c.apellido, SUM(v.importe) as total_compras
FROM clientes c
    JOIN Ventas v ON c.id = v.id_cliente
WHERE
    v.fecha >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
GROUP BY
    c.id
HAVING
    total_compras > 100000;