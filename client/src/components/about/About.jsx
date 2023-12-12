

import { Box, styled, Typography, Link, Button } from '@mui/material';
import { Instagram, Email } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    const navigate = useNavigate();

    return (
        <Box>
            <Banner/>  
            <Wrapper>
                <Typography variant="h3">THE BLOGGERS HUB</Typography>
                <Text variant="h5">Discuss on the latest movies, shows, technnology, sports & music in your country and around the world. <br />
                    Share your ideas as blogs while clicking 
                    <Box component="span" style={{ marginLeft: 5}}>
                        <Button variant='contained' style={{ background: "#878787", color: "white" ,height: '30px', width: '20px'  }} onClick={()=>{ navigate('/')}}>Here</Button>   
                    </Box>
                </Text>
                
            </Wrapper>
        </Box>
    )
}

export default About;