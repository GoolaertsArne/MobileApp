import * as SQLite from "expo-sqlite";

export class UserDAL {
  createDB() {
    const db = SQLite.openDatabase("sqliteD", 1);
    return new Promise((resolve) => {
      db.transaction(
        (tx) =>
          tx.executeSql(
            this._CreateStudentTableQueryBuilder(),
            [],
            (txr, res) => console.log(res),
            (err) => resolve(err)
          ),
        (err) => console.log("err"),
        (success) => console.log("successfull created DB")
      );
    });
  }

  createSignaturesTable() {
    const db = SQLite.openDatabase("sqliteD", 1);
    return new Promise((resolve) => {
      db.transaction(
        (tx) =>
          tx.executeSql(
            this._CreateSignaturesTableQueryBuilder(),
            [],
            (txr, res) => console.log(res),
            (err) => resolve(err)
          ),
        (err) => console.log("err"),
        (success) => console.log("successfull created signature table")
      );
    });
  }




  insertStudents(student) {
    const db = SQLite.openDatabase("sqliteD", 1);
    console.log(this._insertStudentsQueryBuilder(student));
    return new Promise((resolve) => {
      db.transaction(
        (tx) =>
          tx.executeSql(
            this._insertStudentsQueryBuilder(student),
            [],
            (txr, res) => console.log(res),
            (err) => resolve(false)
          ),
        (err) => resolve(false),
        (success) => resolve(true)
      );
    });
  }



  insertSignatureTest() {
    const db = SQLite.openDatabase("sqliteD", 1);
    var query = "INSERT INTO signatures (studentNr, date, signatureBase64, location, is_masterSignature) VALUES ('test', 'test', 'test', 'test', 0);";
    db.transaction(
      (tx) =>
        tx.executeSql(
          query,
          [],
          (txr, res) => console.log("succes", res),
          (txr, err) => console.log("error", err)
        )
      // ,(err) => console.log("err"),
      // (success) => console.log("successfull inserted data in signatures")
    );
  }

  insertSignature(signature) {
    const db = SQLite.openDatabase("sqliteD", 1);
    return new Promise((resolve) => {
    db.transaction(
      (tx) =>
        tx.executeSql(
          //if (selectsignatures([studentNr, is_master] === null) {
          //   this._insertMasterSignaturesQueryBuilder(signature)
          // }
          // else this._insertSignaturesQueryBuilder(signature),
          this._insertSignaturesQueryBuilder(signature)
          ,
          //console.log(this._insertSignaturesQueryBuilder),
          [],
          (txr, res) => console.log(res),
          (err) => resolve(err)
        ),
      (err) => resolve(false),
      (success) => resolve(true)
        );
    });
  }




  insertTest() {
    const db = SQLite.openDatabase("sqliteD", 1);
    var query =
      "INSERT INTO students (studentNr, firstName, lastName) VALUES ('test', 'test', 'test');";
    db.transaction(
      (tx) =>
        tx.executeSql(
          query,
          [],
          (txr, res) => console.log("succes", res),
          (txr, err) => console.log("error", err)
        ),
    );
  }


  getSignatures(cols) {
    const db = SQLite.openDatabase("sqliteD", 1);
    return new Promise((resolve) => {
      db.transaction(
        (tx) =>
          tx.executeSql(
            this._selectQueryBuilder(cols, "signatures", null, null),
            [],
            (txr, res) => resolve(res.rows),
            (err) => console.log(err)
          ),
        (err) => console.log("err"),
        (success) => console.log("success")
      );
    });

  }


  getAllUsers(cols) {
    const db = SQLite.openDatabase("sqliteD", 1);
    return new Promise((resolve) => {
      db.transaction(
        (tx) =>
          tx.executeSql(
            this._selectQueryBuilder(cols, "students", null, null),
            [],
            (txr, res) => resolve(res.rows),
            (err) => console.log(err)
          ),
        (err) => console.log("err"),
        (success) => console.log("success")
      );
    });
  }

  searchStudent(lastName) {
    const db = SQLite.openDatabase("sqliteD", 1);
    return new Promise((resolve) => {
      db.transaction(
        (tx) =>
          tx.executeSql(
            this._selectQueryBuilder(null, "students", lastName, null),
            [],
            (txr, res) => resolve(res.rows),
            (err) => console.log(err)
          ),
        (err) => console.log(err),
        (success) => console.log("success")
      );
    });
  }



  _selectQueryBuilder(cols, table, lastName, sortOption) {
    var query = "SELECT ";
    if (cols) {
      cols.forEach((col) => {
        query += ` ${col},`;
      });
      query = query.slice(0, -1);
    } else {
      query += ` *`;
    }
    query += ` FROM ${table} `;
    if (lastName) {
      query += ` WHERE lastName LIKE '%${lastName}%' `;
    }
    if (sortOption) {
      query += ` ORDER BY ${sortOption.col} ${sortOption.desc === true ? "DESC" : "ASC"
        };`;
    }
    console.log(query)
    return query;

  }



  _insertStudentsQueryBuilder(student) {
    console.log(student);
    var query = "INSERT ";
    query += `INTO students (studentNr, firstName, lastName) VALUES
    ('${student.studentNr}', '${student.firstName}', '${student.lastName}');`;
    return query;
  }


  //NOT YET TESTED 
  _insertSignaturesQueryBuilder(signature) {
    //console.log(signature);
    var query = "INSERT ";
    query += `INTO signatures (studentNr, date, signatureBase64, location, is_masterSignature) VALUES
    ('${signature[0]}', ${signature[1]}, '${signature[2]}', '${signature[3]}', 0);`;
    console.log(query);
    return query;
  }


  _insertMasterSignaturesQueryBuilder(signature){
    var query = "INSERT ";
    query += `INTO signatures (studentNr, date, signatureBase64, location, is_masterSignature) VALUES
    ('${signature[0]}', ${signature[1]}, '${signature[2]}', '${signature[3]}', 1);`;
  }



  //LOCATION NEEDS TO BE ADDED IN SIGNATURE TABLE. 
  _CreateStudentTableQueryBuilder() {
    var query =
      "CREATE TABLE students ( studentNr VARCHAR(7) PRIMARY KEY ,  firstName TEXT NOT NULL, lastName TEXT NOT NULL);";
    console.log(query);
    return query;
  }


  _CreateSignaturesTableQueryBuilder() {
    var query = "CREATE TABLE signatures ( signature_id  INTEGER PRIMARY KEY AUTOINCREMENT , studentNr VARCHAR(7),  date TEXT NOT NULL, signatureBase64 TEXT NULL, location VARCHAR(100), is_masterSignature INTEGER NOT NULL default 0, FOREIGN KEY(studentNr) REFERENCES students (studentNr));"
    // create table validationData ( validationKey int auto_increment primary key, left, right, top, bottom, total)
    console.log(query);
    return query;
  }
}







//date function --> SELECT date('now');