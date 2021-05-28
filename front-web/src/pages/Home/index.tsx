import React from 'react';
import { ReactComponent as MainImage } from 'core/assets/images/main-image.svg'
import ButtonIcon from 'core/components/ButtonIcon';
import { Link } from 'react-router-dom';
import './styles.scss';

const Home = () => (
    <div className="home-container">
        <div className="row home-content card-base border-radius-20">
            <div className="col-6 home-text" >
                <h1 className="text-title">Find all eletronics you are looking for in our e-catalogue!</h1>
                <p className="text-subtitle">Here we help you find the best product for the lowest price.
                </p>
                <Link to="/products">
                    <ButtonIcon text="Start your search" />
                </Link>
            </div>
            <div className="col-6">
                <MainImage className="main-image" />
            </div>
        </div>
    </div>

)

export default Home;