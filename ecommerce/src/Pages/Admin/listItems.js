import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';


export const mainListItems = (
    <div>
        <ListItem button>
            <Link to="/admin/listProduct" style={{ color: 'black ', textDecoration: 'none', fontSize: '1rem' }}>Danh sách sản phẩm</Link>
        </ListItem>
        <ListItem button>
            <Link to="/admin/listOrder" style={{ color: 'black ', textDecoration: 'none', fontSize: '1rem' }}>Danh sách Đơn hàng</Link>
        </ListItem>
        <ListItem button>
            <Link to="/admin/listUser" style={{ color: 'black ', textDecoration: 'none', fontSize: '1rem' }}>Danh sách Khách hàng</Link>
        </ListItem>
        {/* <ListItem button>
            <ListItemText primary="Reports" />
        </ListItem> */}
    </div>
);

