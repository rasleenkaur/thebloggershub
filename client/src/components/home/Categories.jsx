
import {Button, Table,TableHead,TableRow,TableCell,TableBody} from "@mui/material";
import { categories } from "../../constants/data";
import styled from "@emotion/styled";
import { Link, useSearchParams } from "react-router-dom";

const StyledTable = styled(Table)`
    border: 1px solid rgba(224,224,224,1);
`

const StyleButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color:#fff;
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`

const Categories = () =>{

    const [searchParams] = useSearchParams();
    const category= searchParams.get('category');

    return (
        <>
            <StyledLink to={`/create?category=${category || ''}`}>
            <StyleButton variant="contained">Create Blog</StyleButton>
            </StyledLink>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <StyledLink to='/'>
                                 All Categories
                            </StyledLink>
                        </TableCell> 
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category=>{
                            return(
                            <TableRow key={category.id}>
                                <TableCell>
                                    <StyledLink to={`/?category=${category.type}`}>
                                        {category.type}
                                     </StyledLink>
                        </TableCell>
                    </TableRow>
                        )})
                    }
                </TableBody>
            </StyledTable>
        </>
    )
}

export default Categories;