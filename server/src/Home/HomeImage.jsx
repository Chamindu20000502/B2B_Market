import Card from '@mui/material/Card';

function HomeImage()
{
    return(
        <Card raised={true}>
            <div style={{backgroundImage:"url('https://t3.ftcdn.net/jpg/02/15/48/14/360_F_215481459_qe8lG2adbToGTb6DJa1w4dgThK5SL6B2.jpg')",width:"100%",height:"70vh",backgroundSize:"cover",backgroundPosition:"center"}}>

            </div>
        </Card>
    );
}

export default HomeImage;