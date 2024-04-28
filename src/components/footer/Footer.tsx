import packageJson from '../../../package.json'; // adjust the path as needed
import { Box } from '@mui/material';
import scss from '@/styles/Footer.module.scss'
import PropTypes from 'prop-types';

const Footer = () => {
  const author = packageJson.author;
  const version = packageJson.version;
  const currentYear = new Date().getFullYear();

  return (
    <Box className={scss.footerContainer}>
      <footer className={scss.footer} role="contentinfo">
        {`© ${currentYear} ${author} All Rights Reserved || Version: ${version}`}
      </footer>
    </Box>
  );
};

Footer.propTypes = {};

export default Footer;