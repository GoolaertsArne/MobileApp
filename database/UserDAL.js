import * as SQLite from "expo-sqlite";

export class UserDAL {
  createDB() {
    const db = SQLite.openDatabase("sqliteDB1", 1);
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
    const db = SQLite.openDatabase("sqliteDB1", 1);
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
    const db = SQLite.openDatabase("sqliteDB1", 1);
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




  insertStudentsInList(student) {
    const db = SQLite.openDatabase("sqliteDB1", 1);
    console.log(this._insertStudentsQueryBuilder(student));
    return new Promise((resolve) => {
      db.transaction(
        (tx) =>
          tx.executeSql(
            this._insertStudentListQueryBuilder(student),
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
    const db = SQLite.openDatabase("sqliteDB1", 1);
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



  insertSignature(signature, studentNr) {
    const db = SQLite.openDatabase("sqliteDB1", 1);
    return new Promise((resolve) => {
    db.transaction(
      (tx) =>
        tx.executeSql( 
          this._selectSignaturesQueryBuilder(studentNr)
          ,
          [],
          (tx, res) => {
            var dataset = res.rows.length;
            if(dataset == 0){
              db.transaction(
                (tx) => {
                  console.log( this._insertMasterSignaturesQueryBuilder(signature)); 
                  tx.executeSql( this._insertMasterSignaturesQueryBuilder(signature),[], (tx, res) => {
                    //console.log("test")
                  console.log(res);
                });
                }
              );
              }
            else  
            db.transaction(
              (tx) =>tx.executeSql( this._insertSignaturesQueryBuilder(signature),[], (tx, res) => {
              //console.log(res);
            }));
          },
          (err) => resolve(err)
        ),
      (err) => resolve(false),
      (success) => resolve(true)
        );
    });
  }




  insertTest() {
    const db = SQLite.openDatabase("sqliteDB1", 1);
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


  getMasterSignature(studentNr){
    const db = SQLite.openDatabase("sqliteDB1", 1);
    return new Promise((resolve) => {
      db.transaction(
        (tx) =>
          tx.executeSql(
            this._selectMasterImage(studentNr),
            [],
            (txr, res) => resolve(res.rows),
            (err) => console.log(err)
          ),
        (err) => console.log("err"),
        (success) => console.log("success")
      );
    });

  }


  getSignatures(cols) {
    const db = SQLite.openDatabase("sqliteDB1", 1);
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
    const db = SQLite.openDatabase("sqliteDB1", 1);
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
    const db = SQLite.openDatabase("sqliteDB1", 1);
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

  deleteAllStudents(){
    const db = SQLite.openDatabase("sqliteDB1", 1);
    db.transaction(
      (tx) =>
        tx.executeSql(
          this._DeleteStudentsQueryBuilder(),
          [],
          (txr, res) => console.log("succes", res),
          (txr, err) => console.log("error", err)
        ),
    );
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


  _selectSignaturesQueryBuilder(studentNr){
    var query = `SELECT * from signatures where is_masterSignature = 1 AND studentNr = '${studentNr}';`
    return query;
  }

  _selectMasterImage(studentNr){
    var query = `SELECT signatureBase64 from signatures where is_masterSignature = 1 AND studentNr = '${studentNr}';`
    return query;
  }


  _insertStudentsQueryBuilder(student) {
    console.log(student);
    var query = "INSERT ";
    query += `INTO students (studentNr, firstName, lastName) VALUES
    ('${student.studentNr}', '${student.firstName}', '${student.lastName}');`;
    return query;
  }


  _insertStudentListQueryBuilder(student) {
    console.log(student);
    var query = "INSERT ";
    query += `INTO students (studentNr, firstName, lastName) VALUES
    ('${student[0]}', '${student[1]}', '${student[2]}');`;
    return query;
  }

  //NOT WORKING , LOOKING FOR SOLUTION WITH FOREIGN KEY
  _DeleteStudentsQueryBuilder() {
    var query = "DELETE FROM students;"
    console.log(query);
    return query;
  }


  _insertSignaturesQueryBuilder(signature) {
    var query = "INSERT ";
    query += `INTO signatures (studentNr, date, signatureBase64, location, is_masterSignature) VALUES
    ('${signature[0]}', ${signature[1]}, '${signature[2]}', '${signature[3]}', 0);`;
    return query;
  }


  _insertMasterSignaturesQueryBuilder(signature){
    var query = "INSERT ";
    query += `INTO signatures (studentNr, date, signatureBase64, location, is_masterSignature) VALUES
    ('${signature[0]}', ${signature[1]}, '${signature[2]}', '${signature[3]}', 1);`;
    return query;
  }



  _CreateStudentTableQueryBuilder() {
    var query =
      "CREATE TABLE students ( studentNr VARCHAR(7) PRIMARY KEY ,  firstName TEXT NOT NULL, lastName TEXT NOT NULL);";
    console.log(query);
    return query;
  }


  _CreateSignaturesTableQueryBuilder() {
    var query = "CREATE TABLE signatures ( signature_id  INTEGER PRIMARY KEY AUTOINCREMENT , studentNr VARCHAR(7),  date TEXT NOT NULL, signatureBase64 TEXT NULL, location VARCHAR(100), is_masterSignature INTEGER NOT NULL default 0, FOREIGN KEY(studentNr) REFERENCES students (studentNr) ON DELETE CASCADE);"
    console.log(query);
    return query;
  }

}


