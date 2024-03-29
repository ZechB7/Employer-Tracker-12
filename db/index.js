const connection = require("./connection");

class DB {
    // Keeping a reference to the connection on the class in case we need it later
    constructor(connection) {
        this.connection = connection;
    }
    //function(){
    //return this.connection.promise().query(
    // query selector and params
    //);}

    //view all employees
    findAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    //view all employees by department
    findAllEmployeesByDepartment(departmentId) {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id - deparment.id WHERE department.id = ?;",
            departmentId
        );
    }
    //view all employees by manager
    findAllEmployeesByManager(managerId) {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.rol_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
            managerId
        );
    }
    //add employee
    createEmployee(employee) {
        return this.connection.promise().query(
            "INSERT INTO employee SET ?",
            employee
        );
    }
    //remove employee
    removeEmployee(employeeId) {
        return this.connection.promise().query(
            "DELETE FROM employee WHERE id = ?",
            employeeId
        );
    }
    //update employee role
    UpdateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [employeeId, roleId]
        );
    }
    //view all roles
    findAllRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }
    //add role
    createRole(role) {
        return this.connection.promise().query(
            "INSERT INTO role SET ?",
            role
        );
    }
    //remove role
    removeRole(roleId) {
        return this.connection.promise().query(
            "DELETE FROM role WHERE id = ?",
            roleId
        );
    }
    //view all departments
    findAllDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        );
    }
    //add department
    createDepartment(department) {
        return this.connection.promise().query(
            "INSERT INTO department SET ?",
            department
        );
    }
    //remove department
    removeDepartment(departmentId) {
        return this.connection.promise().query(
            "DELETE FROM department WHERE id = ?",
            departmentId
        );
    }
    // view total utilized budget by department
    findDepartmentsCost() {
        return this.connection.promise().query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department = department.id GROUP BY department.id, department.name;"
        )
    }

    //secondary queries
    findAllEmployeesByDepartment(departmentId) {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
            departmentId
        );
    }

    findAllEmployeesByManager(managerId) {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
            managerId
        );
    }
    findAllPossibleManagers(employeeId) {
        return this.connection.promise().query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeId
        );
    }
    updateEmployeeManager(employeeId, managerId) {
        return this.connection.promise().query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",
            [managerId, employeeId]
        );
    }
    viewDepartmentCost() {
        return this.connection.promise().query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
        );
    }
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }
}

module.exports = new DB(connection);