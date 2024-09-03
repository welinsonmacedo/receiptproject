import React from 'react';
import { Menu, MenuContainer, Option ,Title} from './ProfileMenu.styles'

const ProfileMenu = () => {


    return (
        <MenuContainer>
            <Title>Perfil</Title>
            <Menu>
                <Option href='#'>Histórico</Option>
                <Option href='#'>Cadastros</Option>
                <Option href='#'>-</Option>
            </Menu>
        </MenuContainer>
    );
};

export default ProfileMenu;
