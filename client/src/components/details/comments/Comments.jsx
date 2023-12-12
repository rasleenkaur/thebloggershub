import styled from "@emotion/styled";
import { Box, TextareaAutosize, Button} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../context/DataProvider";

import {API} from "../../../service/api";
import Comment from "./Comment";



const Container = styled(Box)  `
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    widht: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px;
    width: 100%;
    margin: 0 20px;
`

const intialValues = {
    name: '',
    postId: '',
    comments: '',
    date: new Date()
}


const Comments = ({post}) =>{

    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(intialValues);
    const [comments, setComments] = useState([]);
    const[toggle, setToggle] = useState(false);

    const {account} = useContext(DataContext);

    useEffect(()=>{
        const getData = async() =>{
            const response = await API.getAllComments(post._id);
            if(response.isSuccess){
                setComments(response.data);
            }
        }
        if(post._id){
            getData();
         }
    },[post, toggle])

    const handleChange= (e) =>{
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        })
    }

    const addComment= async (e)=>{
       let response = await API.newComment(comment);
       if(response.isSuccess){
        setComment(intialValues);
       }
       setToggle(prev => !prev)
    }

    return (
        <Box>
            <Container>
            <Image src={url} alt="dp" />
            <StyledTextArea 
                minRows={5}
                placeholder="What's on your mind?"
                value={comment.comments}
                onChange={(e)=> handleChange(e)}
            />
            <Button 
            variant="contained" 
            color="primary" 
            size="medium" 
            style={{height:40}}
            onClick={(e) =>addComment(e)}>Post</Button>
            </Container>
            <Box>
                {
                    comments && comments.length >0 && comments.map(comment =>(
                        <Comment comment = {comment} setToggle={setToggle}/>
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;