import { useEffect, useState, useContext} from "react";
import { Box, Button, FormControl, InputBase, TextareaAutosize, styled } from "@mui/material";
import {AddCircle as Add} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import {API} from '../../service/api'

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StylesFormControl = styled(FormControl)` 
    margin-top: 10px;
    display:flex;
    flex-direction: row;
`;

const InputTextField=styled(InputBase)` 
    flex: 1; 
    margin: 0 30px; 
    font-size: 25px;
`

const TextArea = styled(TextareaAutosize)`
    width: 100%;
    margin-top:50px;
    font-size: 18px;
    border: none;
    &:focus-visible{
        outline:none;
    }
`



const initialPost = {
    title: "",
    description: "",
    picture: "",
    username: "",
    categories: "",
    createdDate: new Date(),
  };
  
  const CreatePost = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState("");
    const { account } = useContext(DataContext);
  
    const url = post.picture
      ? post.picture
      : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
  
    useEffect(() => {
      const getImage = async () => {
        if (file) {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);
  
          const response = await API.uploadFile(data);
          post.picture = response.data;
        }
      };
      getImage();
      post.categories = location.search?.split("=")[1] || "All";
      post.username = account.username;
    }, [file]);
  
    const savePost=async()=>{
      let response = await API.createPost(post);
      if(response.isSuccess){
        navigate('/');
      }
    }
  
    const handleChange = (e) => {
      setPost({ ...post, [e.target.name]: e.target.value });
    };
  
    return (
      <Container>
        <Image src={url} alt="post" />
  
        <StylesFormControl>
          <label htmlFor="fileInput">
            <Add fontSize="large" color="action" />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <InputTextField
            onChange={(e) => handleChange(e)}
            name="title"
            placeholder="Title"
          />
          <Button  variant="contained" onClick={()=> savePost()} >
            Publish
          </Button>
        </StylesFormControl>
  
        <TextArea
          minRows={5}
          placeholder="Tell your story..."
          name="description"
          onChange={(e) => handleChange(e)}
        />
      </Container>
    );
  };
  
  export default CreatePost;

  