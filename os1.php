<?php

$name = $_GET['file'] ?? 'data';

$file = 'os/' . $name . '.json';

if (!file_exists($file)) {
    die("JSON file not found.");
}

$json = file_get_contents($file);

$data = json_decode($json, true);

if (!$data) {
    die("Invalid JSON format.");
}

?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>
        <?php echo $data['title_section']['title'] ?? 'Document'; ?>
    </title>

    <style>

        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body{
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            color: #222;
            line-height: 1.7;
            padding: 20px;
        }

        .container{
            max-width: 1000px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        h1{
            font-size: 32px;
            margin-bottom: 10px;
            color: #111;
        }

        h2{
            margin-top: 35px;
            margin-bottom: 15px;
            color: #0056b3;
            border-bottom: 2px solid #eee;
            padding-bottom: 8px;
        }

        h3{
            margin-bottom: 10px;
            color: #222;
        }

        p{
            margin-bottom: 15px;
        }

        ul{
            margin-left: 20px;
            margin-top: 10px;
        }

        li{
            margin-bottom: 10px;
        }

        .card{
            background: #fafafa;
            border-left: 5px solid #0056b3;
            padding: 20px;
            margin-top: 20px;
            border-radius: 8px;
        }

        .meta{
            margin-top: 10px;
            color: #666;
        }

        .video-box{
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }

        a{
            color: #0056b3;
            text-decoration: none;
        }

        a:hover{
            text-decoration: underline;
        }

        @media(max-width:768px){

            body{
                padding: 10px;
            }

            .container{
                padding: 20px;
            }

            h1{
                font-size: 24px;
            }

        }

    </style>

</head>

<body>

<div class="container">

    <!-- ==========================
         TITLE SECTION
    =========================== -->

    <?php if(isset($data['title_section'])): ?>

        <h1>
            <?php echo $data['title_section']['title'] ?? ''; ?>
        </h1>

        <div class="meta">

            <?php if(isset($data['title_section']['subject'])): ?>

                <p>
                    <strong>Subject:</strong>
                    <?php echo $data['title_section']['subject']; ?>
                </p>

            <?php endif; ?>

            <?php if(isset($data['title_section']['detected_topic'])): ?>

                <p>
                    <strong>Topic:</strong>
                    <?php echo $data['title_section']['detected_topic']; ?>
                </p>

            <?php endif; ?>

        </div>

    <?php endif; ?>



    <!-- ==========================
         KEY POINTS SECTION
    =========================== -->

    <?php if(isset($data['key_points_section']) && is_array($data['key_points_section'])): ?>

        <h2>Key Points</h2>

        <ul>

            <?php foreach($data['key_points_section'] as $point): ?>

                <li>
                    <?php echo $point; ?>
                </li>

            <?php endforeach; ?>

        </ul>

    <?php endif; ?>



    <!-- ==========================
         CONCEPTS SECTION
    =========================== -->

    <?php if(isset($data['concepts_section']) && is_array($data['concepts_section'])): ?>

        <h2>Concepts</h2>

        <?php foreach($data['concepts_section'] as $concept): ?>

            <div class="card">

                <?php if(isset($concept['concept'])): ?>

                    <h3>
                        <?php echo $concept['concept']; ?>
                    </h3>

                <?php endif; ?>

                <?php if(isset($concept['explanation'])): ?>

                    <p>
                        <?php echo nl2br($concept['explanation']); ?>
                    </p>

                <?php endif; ?>

            </div>

        <?php endforeach; ?>

    <?php endif; ?>



    <!-- ==========================
         SUMMARY SECTION
    =========================== -->

    <?php if(isset($data['summary_section'])): ?>

        <h2>Summary</h2>

        <?php if(isset($data['summary_section']['short_summary'])): ?>

            <p>
                <?php echo $data['summary_section']['short_summary']; ?>
            </p>

        <?php endif; ?>

        <?php if(isset($data['summary_section']['important_takeaways'])): ?>

            <h3>Important Takeaways</h3>

            <ul>

                <?php foreach($data['summary_section']['important_takeaways'] as $takeaway): ?>

                    <li>
                        <?php echo $takeaway; ?>
                    </li>

                <?php endforeach; ?>

            </ul>

        <?php endif; ?>

    <?php endif; ?>



    <!-- ==========================
         RELATED VIDEO SECTION
    =========================== -->

    <?php if(isset($data['related_video_section'])): ?>

        <h2>Related Video</h2>

        <div class="video-box">

            <?php if(isset($data['related_video_section']['title'])): ?>

                <h3>
                    <?php echo $data['related_video_section']['title']; ?>
                </h3>

            <?php endif; ?>

            <?php if(isset($data['related_video_section']['summary'])): ?>

                <p>
                    <?php echo $data['related_video_section']['summary']; ?>
                </p>

            <?php endif; ?>

            <?php if(isset($data['related_video_section']['url'])): ?>

                <a href="<?php echo $data['related_video_section']['url']; ?>" target="_blank">
                    Watch Video
                </a>

            <?php endif; ?>

        </div>

    <?php endif; ?>

</div>

</body>
</html>
