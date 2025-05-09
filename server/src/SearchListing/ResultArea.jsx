import Item from './Item'

function ResultArea()
{
  return(
    <div className='border-start' style={{display: 'flex', flexWrap: 'wrap', width: '100%',justifyContent: 'space-around'}}>
      <Item/>
      <Item/>
      <Item/>
      <Item/>
      <Item/>
    </div>
  );
}

export default ResultArea;