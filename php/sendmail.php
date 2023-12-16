<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;


require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/SMTP.php';



if (isset($_POST['sendEmail'])) {
    $from = "mappingninja@gmail.com";
    $to = "mappingninja+1@gmail.com";
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
    $body = "
    <div>
        <h1>Hey Boss! We got new Lead 🤑</h1>
        <div>
            <div><strong>Name: </strong> $name</div>
            <div><strong>Email:</strong> $email</div>
            <div><strong>Messsage:</strong> $message</div>
        </div>
    </div>
    ";

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->SMTPAuth = true;
    $mail->Host = "smtp.gmail.com";
    $mail->Username = $from;
    $mail->Password = "xyvhystuxmcbvkgq";
    $mail->SMTPSecure = "ssl";
    $mail->Port = 465;

    $mail->setFrom($from);
    $mail->addAddress($to);
    $mail->isHTML(true);

    $mail->Subject = $subject;
    $mail->Body = $body;

    $mail->send();

    echo "
    <script>
        const protocol = window.location.protocol
        if(protocol && protocol === 'http:'){
            document.location.href='/mappingninja/#contact';
        } else {
            document.location.href='/#contact';
        }
    </script>
    ";
}
?>