import React, { useState, useEffect } from 'react';
import './SidebarCss.css';
import { Button, Grid, Paper, IconButton, InputBase, Box } from '@mui/material';
import Zoom from '@mui/material/Zoom';

//Toggle
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

//icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import GridViewcIon from '@mui/icons-material/GridView';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';





const Sidebar = () => {
  const [items, setItems] = useState([]);
  const [colors, setColors] = useState([]);
  const [Shape, setShape] = useState([]);
  const [isserach, setIsserach] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [checked, setChecked] = useState([]);
  const [schecked, setSChecked] = useState([]);
  const [align, setAlign] = useState(false);



  const handleToggle = (value) => () => {

    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    fetchdata();
  };

  const handleSToggle = (value) => () => {
    const currentIndex = schecked.indexOf(value);
    const newChecked = [...schecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSChecked(newChecked);
    fetchdata();
  };

  const handleClear = () => {
    setChecked([]);
    setSChecked([]);
    fetchdata();
    setIsFilter(false);
  }

  const handleSubmitFilter = () => {
    let result = [];
    let product = items;
    product.map((p) => {
      checked.map((l) => {
        if (l == p.color) {
          result.push(p);
        }
      });
      schecked.map((l) => {
        if (l == p.color) {
          result.push(p);
        }
      });
    });
    setItems(result);
    setIsFilter(false);
  }

  useEffect(() => {
    fetchdata();
    fetchColors();
    fetchShape();

  }, []);

  const fetchdata = () => {
    fetch('/product.json')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching data:', error));
  }

  const fetchColors = () => {
    fetch('/color.json')
      .then(response => response.json())
      .then(data => setColors(data))
      .catch(error => console.error('Error fetching data:', error));
  }

  const fetchShape = () => {
    fetch('/shape.json')
      .then(response => response.json())
      .then(data => setShape(data))
      .catch(error => console.error('Error fetching data:', error));
  }

  const handleOpenSerach = () => {
    setIsserach(!isserach);
    fetchdata();
  }

  const handleSearch = (event) => {
    const value = event.target.value;
    if (value) {
      const filtered = items.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setItems(filtered);
    } else {
      fetchdata();
    }
  };

  const handleOpenFilterMenu = () => {
    setIsFilter(true);
  }

  const handleAlignment = () => {
    setAlign(!align)
  }

  const icon = (
    <Box
      component="form"
      sx={{
        p: '2px 4px', display: 'flex', alignItems: 'center', width: 300,
        border: '1px solid rgba(0, 0, 0, 0.3)',
        borderRadius: '8px',
        height: '2.65rem'
      }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={handleSearch}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleOpenSerach}>
        <CloseIcon />
      </IconButton>
    </Box>
  );

  return (
    <Grid>
      <div className='css-56rbvn'>
        <a href="http://roomvo.com" target="_blank" className='css-fg4i5t'></a>
      </div>
      <div className='filter-tab'>
        {isFilter ?
          <div className='Filters-menu'>
            <div className='css-1kzzply'>
              <div className='css-19s3t1h'>
                <Accordion className='accodian-tab'>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    Color ({checked.length})
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                      {colors.map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value.id}`;
                        return (
                          <ListItem
                            key={value}
                            secondaryAction={
                              <Checkbox
                                edge="end"
                                onChange={handleToggle(value.color)}
                                checked={checked.indexOf(value.color) !== -1}
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            }
                            disablePadding
                          >
                            <ListItemButton>
                              <img style={{ padding: '0 10px 0 0' }} src={value.img} />
                              <ListItemText id={labelId} primary={value.color} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    Shape ({schecked.length})
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                      {Shape.map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value.id}`;
                        return (
                          <ListItem
                            key={value}
                            secondaryAction={
                              <Checkbox
                                edge="end"
                                onChange={handleSToggle(value.color)}
                                checked={schecked.indexOf(value.color) !== -1}
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            }
                            disablePadding
                          >
                            <ListItemButton>
                              <ListItemText id={labelId} primary={value.color} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </AccordionDetails>
                </Accordion>

              </div>
            </div>
            <div className='css-1tdu8us'>
              <Button className='css-1k5dt4u' onClick={handleClear}>
                Clear filter
              </Button>
              <Button className='css-12ffqe8' onClick={handleSubmitFilter}>
                Done
              </Button>
            </div>
          </div>
          :
          <div className='sub-filter'>
            <div className='css-11ncnq9'>
              <div className='filter-tab1'>
                <div className='filter-tab2'>
                  {!isserach ?
                    <Button className='serach-button' onClick={handleOpenSerach}>
                      <SearchIcon />
                    </Button> : null}
                  <Button className='filter-button' onClick={handleOpenFilterMenu}>
                    <FilterListIcon />
                    Filters
                  </Button>
                  <ToggleButtonGroup
                    className='toggle-filter'
                    value={align}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                  >
                    <ToggleButton value={false} aria-label="left aligned">
                      <MenuIcon />
                    </ToggleButton>
                    <ToggleButton value={true} aria-label="centered">
                      <GridViewcIon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>
              {isserach ?
                <Zoom in={isserach} style={{ transitionDelay: isserach ? '10ms' : '0ms' }}>
                  {icon}
                </Zoom> : null}
              <div className='middle-list-tab'>
                <Box sx={{
                  color: 'rgb(47, 51, 55)',
                  position: 'relative',
                  height: '100%',
                  width: '100%',
                  overflow: 'auto',
                }}>
                  <Box>
                    {align === true ? <div>                      {
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingbottom: '0.625rem',
                      }}>
                        <div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          {items.map((product) => (
                            <div style={{ flex: '1 1 0%' }}>
                              <div className='css-1qksi01'>
                                <div className='css-1fbnyj3'>
                                  <img style={{ width: '10%', }} src={product.img} />
                                </div>
                              </div>

                            </div>
                            ))}
                        </div>
                      </div>
                      </Box>}
                        
                    </div>
                      :
                      <div>
                        {
                          items.map((product) => (
                            <Box sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              paddingbottom: '0.625rem',
                            }}>
                              <div style={{ flex: '1 1 0%' }} >
                                <div className='Expanded-detailed-product-card'>
                                  <Box sx={{
                                    display: 'flex',
                                    gap: '1rem'
                                  }}>
                                    <div className='img-card'>
                                      <img className='css-fcwd8r' src={product.img} />
                                    </div>
                                    <Box sx={{
                                      display: 'flex',
                                      flexDirection: 'column'
                                    }}>
                                      <div className='text-warp'>
                                        <p className='small-text1'>Roomvo</p>
                                        <h4 className='typho'>{product.name}</h4>
                                        <h3 className='samllest'>{product.size}</h3>

                                      </div>
                                      <div></div>
                                    </Box>
                                  </Box>
                                </div>
                              </div>
                            </Box>
                          ))}
                      </div>}
                  </Box>
                </Box>
              </div>
            </div>
          </div>}
      </div>
    </Grid >
  );
};

export default Sidebar;