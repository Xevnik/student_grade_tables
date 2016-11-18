<?php
/**
 * Created by PhpStorm.
 * User: kevin
 * Date: 11/18/16
 * Time: 9:11 AM
 */
require_once('my_connect.php');

$readQuery = "
SELECT g.`ID` AS ID, g.`grade` AS grade, s.`name` AS name, c.`name` AS course 
FROM `grades` AS g 
JOIN students AS s ON s.`ID` = g.`student_id` 
JOIN courses AS c ON c.`ID` = g.`course_id`
";

$readResult = mysqli_query($conn, $readQuery);
if(mysqli_num_rows($readResult) > 0){
    $readData['success'] = true;
    while($row = mysqli_fetch_assoc($readResult)){
        //print_r($row);
        $readData['data'][] = [
            'id' => (int)$row['ID'],
            'name' => $row['name'],
            'grade' => (int)$row['grade'],
            'course' => $row['course']
        ];
    }
}

//$dummyData = [
//    "success"=> true,
//    "data"=> [
//        [
//            "id"=> 1,
//            "name"=> "student name",
//            "grade"=> 99,
//            "course"=> "student course"
//        ],
//        [
//            "id"=> 2,
//            "name"=> "Danh",
//            "grade"=> 25,
//            "course"=> "name pronunciations"
//        ]
//    ]
//];
//print_r($readData);
//print_r($dummyData);
$jsonReadData = json_encode($readData);
print($jsonReadData);
?>