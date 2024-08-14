import React from 'react';
import "./FooterStyles.css";

const Footer = () =>{

    return(

        <>
        <div className='footer'>

        <div className='top'>
            <div>
                <h1>Tripper</h1>
                <p>Make that trip possible!</p>
            </div>

            <div>

                <a href='https://www.linkedin.com/in/pandey26tanishq'>
                <i className='fa-brands fa-linkedin'></i>
                </a>

                <a href='https://github.com/tanishqpandey26'>
                <i className='fa-brands fa-github'></i>
                </a>
                
                <a href='https://twitter.com/tanishqvatsa26'>
                <i className='fa-brands fa-twitter'></i>
                </a>

                <a href='https://digital-resume-fawn.vercel.app/'>
                <i className='fa-solid fa-file-pdf'></i>
                </a>

            </div>

        </div>

        <div className='bottom'>

            <div>

            <h4>Project</h4>

            <a href='/'>Tripper</a>
            <a href='https://cotlog-social-blog-website.vercel.app/'>Cotlog</a>
            <a href='https://digital-resume-fawn.vercel.app'>Digital Resume</a>

            </div>

            <div>

<h4>Community</h4>

<a href='https://github.com/tanishqpandey26'>GitHub</a>
<a href='https://www.linkedin.com/in/pandey26tanishq'>Linkedin</a>
<a href='https://twitter.com/tanishqvatsa26'>Twitter</a>

</div>

<div>

<h4>Help</h4>

<a href='/service'>Support</a>
<a href='/contact'>Troubleshooting</a>
<a href='/contact'>Contact Us</a>

</div>

<div>

<h4>Others</h4>

<a href='/about'>Terms of Service</a>
<a href='/about'>Privacy Policy</a>
<a href='/about'>License</a>

</div>

        </div>

        <div className='footer-copyright'>
            <h3>Copyright &#169; 2023 Tanishq Pandey</h3>
        </div>


        </div>

        
        
        </>

    )

}

export default Footer;
