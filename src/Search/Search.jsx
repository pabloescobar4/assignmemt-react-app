import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './Search.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { maxHeight } from '@mui/system';

const Search = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [toggle, setToggle] = useState(false);
  const [page, setPage] = React.useState(1);
 
  const getData = async (page) => {
    axios
      .get(
        `http://content.guardianapis.com/search?api-key=test&q=${search}&show-fields=thumbnail,headline&show-tags=keyword&page=${page}&page-size=10`
      )
      .then((response) => setData(response.data))
	  
  };
  useEffect(() => {

      getData(page);
    
  }, [search,page]);

  const handleChange = () => {
    setToggle(true);
  };
  console.log(search, toggle,page,data);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setToggle(false);
  };
  const handlePage = (event, value) => {
    setPage(value);
  };
  return (
    <div className="App">
      <input
        type="text"
        value={search}
        placeholder="Enter  Search text"
        onChange={handleSearch}
      />
      <button onClick={handleChange} className="Button">
        Search
      </button>

      {search.length > 0 && toggle
        ? <div>  <div className="Container" > {data.response.results.map((element) => {
            return (
              <>
                <div key={element.id}>
					<div>
                  <Card sx={{ maxWidth: 345 , height:400}}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={element.fields.thumbnail}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {element.fields.headline}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {element.sectionName}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
				  </div>
                </div>
			
              </>
            );
			
          })
		  }
		  </div>
		  <div className="Pagination">
		  <Stack spacing={2}>
        <Pagination count={10} color="primary" page={page} onChange={handlePage} />
      </Stack>
			</div> </div>
        : null}

     
    </div>
  );
};
export default Search;
