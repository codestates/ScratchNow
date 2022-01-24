// import React from "react";
// import { useState } from "react";
// import AWS from "aws-sdk";
// import { Button, Input, Alert } from "reactstrap";
// import styled from "styled-components";

// const FileCheckBox = styled.div`
//   input[id="editicon"] {
//     display: none;
//   }
//   input[id="editicon"] + label {
//     display: flex;
//     width: auto;
//     height: auto;
//     background-color: none;
//     cursor: pointer;
//     transform: translate(530%, 430%);
//   }
// `;

// const ImgUpload = () => {
//   const [progress, setProgress] = useState(0);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [showAlert, setShowAlert] = useState(false);
//   //본인 aws
//   const ACCESS_KEY = "AKIAWIGQ4AAXYOGZH7HD";
//   const SECRET_ACCESS_KEY = "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";
//   const REGION = "ap-northeast-2";
//   const S3_BUCKET = "sunwoocrayontest";

//   AWS.config.update({
//     accessKeyId: ACCESS_KEY,
//     secretAccessKey: SECRET_ACCESS_KEY,
//   });

//   const myBucket = new AWS.S3({
//     params: { Bucket: S3_BUCKET },
//     region: REGION,
//   });

//   const uploadFile = (file) => {
//     const params = {
//       ACL: "public-read",
//       Body: file,
//       Bucket: S3_BUCKET,
//       Key: "upload/" + file.name,
//     };

//     myBucket
//       .putObject(params)
//       .on("httpUploadProgress", (evt) => {
//         setProgress(Math.round((evt.loaded / evt.total) * 100));
//         setShowAlert(true);
//         setTimeout(() => {
//           setShowAlert(false);
//           setSelectedFile(null);
//         }, 3000);
//       })
//       .send((err) => {
//         if (err) console.log(err);
//       });
//   };
//   const handleFileInput = (e) => {
//     const file = e.target.files[0];
//     const fileExt = file.name.split(".").pop();
//     if (file.type !== "image/jpeg" || fileExt !== "jpg") {
//       alert("jpg 파일만 Upload 가능합니다.");
//       return;
//     }
//     setProgress(0);
//     setSelectedFile(e.target.files[0]);
//   };
//   return (
//     <div>
//       {showAlert ? (
//         <Alert color="primary">업로드 진행률 : {progress}%</Alert>
//       ) : //   <Alert color="primary">파일을 선택해 주세요.</Alert>
//       null}
//       <FileCheckBox>
//         <Input id="editicon" type="file" onChange={handleFileInput} />
//         <label htmlFor="editicon">
//           {" "}
//           <i class="fas fa-camera fa-2x"></i>
//         </label>
//       </FileCheckBox>
//       {selectedFile ? (
//         <Button color="primary" onClick={() => uploadFile(selectedFile)}>
//           저장
//         </Button>
//       ) : null}
//     </div>
//   );
// };

// export default ImgUpload;

import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import S3 from "react-aws-s3";
import axios from "axios";
import { Input } from "reactstrap";

const FileCheckBox = styled.div`
  input[id="editicon"] {
    display: none;
  }
  input[id="editicon"] + label {
    display: flex;
    width: auto;
    height: auto;
    background-color: none;
    cursor: pointer;
    transform: translate(530%, 430%);
  }
`;

const ImgUpload = () => {
  //   const imagePatchConfig = {
  //     headers: {
  //       Authorization: `Bearer ${
  //         JSON.parse(localStorage.getItem("userinfo")).token
  //       }`,
  //       "Content-Type": "application/json",
  //     },
  //   };
  const handleClick = (event) => {
    const file = event.target.files[0];
    const newFileName = uuidv4();
    const ACCESS_KEY = "AKIAWIGQ4AAXYOGZH7HD";
    const SECRET_ACCESS_KEY = "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";
    const REGION = "ap-northeast-2";
    const S3_BUCKET = "sunwoocrayontest";
    const config = {
      bucketName: S3_BUCKET,
      region: REGION,
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    };
    const ReactS3Client = new S3(config);
    if (file) {
      if (file.size >= 1 * 1024 * 1024) {
        alert("1mb 이하의 파일만 업로드 가능합니다.");
        event.target.value = null;
      } else {
        if (
          file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/jpg"
        ) {
          ReactS3Client.uploadFile(file, newFileName).then((data) => {
            // console.log(data);
            axios
              .patch(
                "http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:3000/api/userinfo",
                { profile_img: data.location }
                // imagePatchConfig
              )
              .then((res) => {
                console.log(res, "이미지 보내짐");
                if (
                  JSON.parse(localStorage.getItem("userinfo")).image.split(
                    "."
                  )[0] === "https://sunwoocrayontest"
                ) {
                  ReactS3Client.deleteFile(
                    JSON.parse(localStorage.getItem("userinfo")).image.split(
                      "/"
                    )[3]
                  )
                    .then((res) => {
                      localStorage.setItem(
                        "userinfo",
                        JSON.stringify({
                          ...JSON.parse(localStorage.userinfo),
                          image: data.location,
                        })
                      );
                      window.location.reload();
                      // console.log(res, '삭제');
                    })
                    .catch((err) => {
                      console.log(err, "삭제안됨");
                      console.log(
                        JSON.parse(localStorage.getItem("userinfo")).image,
                        "tet"
                      );
                    });
                } else {
                  localStorage.setItem(
                    "userinfo",
                    JSON.stringify({
                      ...JSON.parse(localStorage.userinfo),
                      image: data.location,
                    })
                  );
                  window.location.reload();
                }
              })
              .catch((err) => {
                console.log(err, "이미지 변경 안됨");
              });
          });
        } else {
          console.log("파일확장명 확인");
          alert("JPEG, PNG, JPG 파일만 업로드 가능합니다.");
          event.target.value = null;
        }
      }
    }
  };
  //
  return (
    <div>
      <FileCheckBox>
        <Input
          id="editicon"
          type="file"
          accept="image/*"
          onChange={handleClick}
        />
        <label htmlFor="editicon">
          {" "}
          <i class="fas fa-camera fa-2x"></i>
        </label>
      </FileCheckBox>
    </div>
  );
};

export default ImgUpload;
