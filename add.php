<pre>
    <?php
    /**
     * Created by PhpStorm.
     * User: kevin
     * Date: 11/18/16
     * Time: 11:30 AM
     */
    require_once('my_connect.php');
    $addRequest = $_POST;
    print_r($addRequest);

    //$addStudent = "
    //INSERT INTO `students` SET `name`=\"Kevin Chau\", `created`=NOW(),`modified`=NOW()
    //";

    //$addResult = mysqli_query($conn, $readQuery);
    //if(mysqli_num_rows($readResult) > 0){
    //    $readData['success'] = true;
    //    while($row = mysqli_fetch_assoc($addResult)){
    //        //print_r($row);
    //        $readData['data'][] = [
    //            'id' => (int)$row['ID'],
    //        ];
    //    }
    //}


    $jsonAddData = json_encode($addData);
    print($jsonAddData);
    ?>
</pre>