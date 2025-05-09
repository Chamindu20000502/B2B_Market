import Navbar from '../Home/Navbar'
import ResultArea from './ResultArea'
import FiltersFS from './FiltersFS'
import Box from '@mui/material/Box';
import SearchNavBar from './SearchNavBar'

function SearchListing() {
    return (
        <div>
            <SearchNavBar/>            
            <div style={{display: 'flex',}}>
                <Box sx={{display:{xs:'none',sm:'none',md:'flex'}}}><FiltersFS/></Box>
                <ResultArea/>
            </div>              
        </div>
    );
}
export default SearchListing;