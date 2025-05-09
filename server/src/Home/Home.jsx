import Navbar from "./Navbar";
import HomeImage from "./HomeImage";
import CatagoriesArea from "./CatagoriesArea";
import ClientsArea from "./ClientsArea";
import Footer from "./Footer";

function Home()
{
    return(
        <div>
            <Navbar></Navbar>
            <HomeImage></HomeImage>
            <CatagoriesArea></CatagoriesArea>
            <ClientsArea></ClientsArea>
            <Footer></Footer>
        </div>
    );
}

export default Home;