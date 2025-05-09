import MultiSelectFilter from "./MultiSelectFilter";
import TextInput from "./TextInput";
import './SearchListing.css'
import Button from '@mui/material/Button';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function FiltersFS()
{
    return (
        <div className='border rounded-1' style={{width: '15rem',margin:"1rem"}}>            
            <div className="m-1 mt-4 pt-2 pb-2">
                <MultiSelectFilter title='Countries' description='Select suppliers countrie(s)' items={names}/>
            </div>
            <div className="m-1 mt-4 pt-2 pb-2">
                <MultiSelectFilter title='Catagories' description='Select supplierie(s)' items={names}/>
            </div>
            <div className="m-1 mt-4 pt-2 pb-2">
                <label for="priceRange" className="form-label fw-bold">Enter price range</label>
                <div id="priceRange">
                    <TextInput title="Min"></TextInput>
                    <TextInput title="Max"></TextInput>
                </div>                
            </div>
            <div style={{display: 'flex',justifyContent: 'center'}} className="m-1 mt-4 pt-2 pb-2">
            <Button variant="contained" onClick={{}}>Apply</Button> 
            </div>
        </div>
    );
}

export default FiltersFS;