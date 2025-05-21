-- 1. Crear la base de datos
DROP DATABASE IF EXISTS nexus_banca;
CREATE DATABASE nexus_banca;
USE nexus_banca;

-- 2. Tabla de Clientes
CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  curp CHAR(18) NOT NULL UNIQUE,
  direccion VARCHAR(255),
  telefono VARCHAR(15)
);

-- 3. Tabla de Cuentas
CREATE TABLE cuentas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  numero_cuenta VARCHAR(20) NOT NULL UNIQUE,
  cliente_id INT NOT NULL,
  saldo DECIMAL(12, 2) DEFAULT 0.00,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

-- 4. Tabla de Transacciones
CREATE TABLE transacciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cuenta_id INT NOT NULL,
  tipo ENUM('deposito', 'retiro') NOT NULL,
  monto DECIMAL(12, 2) NOT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cuenta_id) REFERENCES cuentas(id) ON DELETE CASCADE
);

-- 5. Insertar datos simulados

-- Clientes
INSERT INTO clientes (nombre, curp, direccion, telefono) VALUES
('Juan Pérez', 'PEMJ800101HDFRRN09', 'Av. Reforma #123', '6121234567'),
('Ana López', 'LOPA920202MBSRRN03', 'Calle Hidalgo #456', '6127654321'),
('Carlos Ruiz', 'RUIC850303HBSRRN05', 'Blvd. Forjadores #789', '6120001111'),
('María Torres', 'TORM940404MBSRRN06', 'Av. Universidad #222', '6123334444'),
('Luis Mendoza', 'MELU950505HBSRRN08', 'Calle 5 de Mayo #333', '6125556666');

-- Cuentas
INSERT INTO cuentas (numero_cuenta, cliente_id, saldo) VALUES
('1001001001', 1, 5000.00),
('1001001002', 2, 7500.00),
('1001001003', 3, 3200.00),
('1001001004', 4, 10200.00),
('1001001005', 5, 8700.00);

-- Transacciones
INSERT INTO transacciones (cuenta_id, tipo, monto) VALUES
(1, 'deposito', 5000.00),
(2, 'deposito', 7500.00),
(3, 'deposito', 3200.00),
(4, 'deposito', 10200.00),
(5, 'deposito', 8700.00);

-- Transacciones
INSERT INTO transacciones (cuenta_id, tipo, monto) VALUES
(1, 'retiro', 1500.00),
(2, 'retiro', 2000.00),
(3, 'retiro', 500.00),
(4, 'retiro', 1200.00),
(5, 'retiro', 700.00);
