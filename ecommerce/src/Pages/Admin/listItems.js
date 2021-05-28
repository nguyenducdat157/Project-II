import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';


function ListItems(){
    return (
        <div>
        <ListItem button>
            <Link to={{pathname:"/admin/listProduct", state:{role:"admin"}}} style={{ color: 'black ', textDecoration: 'none', fontSize: '1rem' }}>Danh sách sản phẩm</Link>
        </ListItem>
        <ListItem button>
            <Link to={{pathname:"/admin/listOrder", state:{role:"admin"}}} style={{ color: 'black ', textDecoration: 'none', fontSize: '1rem' }}>Danh sách Đơn hàng</Link>
        </ListItem>
        <ListItem button>
            <Link to="/admin/listUser" style={{ color: 'black ', textDecoration: 'none', fontSize: '1rem' }}>Danh sách Khách hàng</Link>
        </ListItem>
        {/* <ListItem button>
            <ListItemText primary="Reports" />
        </ListItem> */}
    </div>
    );
}
    
export default ListItems;

