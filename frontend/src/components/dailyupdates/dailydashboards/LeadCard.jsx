import React from 'react';
import { Card, CardContent, CardMedia, Typography, Avatar, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
    maxWidth: '100%',
    width: '100%',
    margin: 'auto',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
    transition: '0.3s',
    '&:hover': {
        boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)'
    },
});

const StyledAvatar = styled(Avatar)({
    width: 100,
    height: 100,
    margin: 'auto',
    marginBottom: 10,
});

const StyledCardContent = styled(CardContent)({
    textAlign: 'center',
});

const StyledTitle = styled(Typography)({
    fontSize: 24,
    fontWeight: 'bold',
});

const ProfileCard = (props) => {
    return (
        <StyledCard>
            <CardMedia
                component="img"
                alt={props.data.name}
                height="140"
                sx={{opacity:'1', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}
                image='https://t3.ftcdn.net/jpg/03/36/88/74/360_F_336887470_eDPhINBUwztCuL7HvkYdw1cmU1DuHSwm.jpg'
                title={props.data.name}
            />
            <StyledCardContent>
                <StyledAvatar src={props.data.profile_pic} sx={{mt:'-70px',border: '5px solid #dadada'}}/>
                <StyledTitle>
                    {props.data.name}
                </StyledTitle>
                <Typography variant="body2" color="textSecondary" component="p">
                    Emp ID:  {props.data.employee_id}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Department: {props.data.department}
                </Typography>
                {/* <Typography variant="body2" color="textSecondary" component="p">
          Reportee: {props.data.reporting_to}
        </Typography> */}
                <Typography variant="body2" color="textSecondary" component="p">
                    IRP: {props.data.reporting_to}
                </Typography>
                <Button sx={{mt:2}} variant="contained" onClick={()=>props.function()}>View Details</Button>
            </StyledCardContent>
        </StyledCard>
    );
}

export default ProfileCard;
