```sql

GRANT SELECT,INSERT,CREATE,ALTER,DROP,LOCK TABLES,CREATE TEMPORARY TABLES, DELETE,UPDATE,EXECUTE ON hsraidb.* TO 'hsrai'@'%';

CREATE TABLE Students (
    StudentID int,
    LastN varchar(255),
    FirstN varchar(255),
    Addr varchar(255),
    City varchar(255)
);

CREATE TABLE Persons (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);

INSERT INTO Persons (PersonID, LastName, FirstName, Address, City)
VALUES (1, 'Rai', 'Hardeep', 'H No 21, GNE Campus', 'Ludhiana');

INSERT INTO Persons (PersonID, LastName, FirstName, Address, City)
VALUES (1, 'Rai', 'Nmt', 'H No 22, GNDE Campus', 'Phagwara');

INSERT INTO Students (StudentID, LastN, FirstN, Addr, City)
VALUES (1, 'Rait', 'Pardeep', 'H No 31, IIT Campus', 'Delhi');

INSERT INTO Students (StudentID, LastN, FirstN, Addr, City)
VALUES (1, 'Sharma', 'Nirmal', 'H No 32, IISc Campus', 'Bangalore');
```

```sh
#!/bin/bash

# Check if the required arguments are provided
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <sting to search>"
  exit 1
fi

# Assign command line arguments to variables

search_string="$1"
database_name="DataBaseName"
username="user"
password="SectretPassword"

# Prompt for the string to search for
#read -p "Enter the string to search for: " search_string

# MySQL query to find the table and column with the given string
query="SELECT table_name, column_name, data_type
       FROM information_schema.columns
       WHERE table_schema = '$database_name';"

# Execute the query and capture the output
columns=$(mysql -u "$username" -p"$password" -D "$database_name" -s -r -e "$query")

# Loop through the columns and search for the string in the content
while IFS=$'\t' read -r table_name column_name data_type; do
  # Check if the column type is text-like
  if [[ "$data_type" =~ ^(varchar|text|char)$ ]]; then
    search_query="SELECT COUNT(*)
                   FROM $database_name.$table_name
                   WHERE $column_name LIKE '%$search_string%';"

    result=$(mysql -u "$username" -p"$password" -D "$database_name" -s -r -e "$search_query")

    # If the count is greater than 0, print the table and column information
    if [ "$result" -gt 0 ]; then
      echo "Results found for string '$search_string' in table '$table_name' and column '$column_name'."
    fi
  fi
done <<< "$columns"
```
