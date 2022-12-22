import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="tm-section-pad-top tm-parallax-2">
      <div className="container tm-container-contact">
        <div className="row">
            <div className="text-center col-12">
                <h2 className="tm-section-title mb-4">Contact Us</h2>
                <p className="mb-5">
                 Have any question? 
                </p><br/>
            </div>
            
            <div className="col-sm-12 col-md-6">
              <form action="" method="get">
                <input id="name" name="name" type="text" placeholder="Your Name" className="tm-input" required />
                <input id="email" name="email" type="email" placeholder="Your Email" className="tm-input" required />
                <textarea id="message" name="message" rows="8" placeholder="Message" className="tm-input" required></textarea>
                <button type="submit" className="btn tm-btn-submit">Submit</button>
              </form>
            </div>
            
            <div className="col-sm-12 col-md-6">

                {/* <div className="contact-item">
                  <a rel="nofollow" href="https://www.tooplate.com/contact" className="item-link">
                      <i className="far fa-2x fa-comment mr-4"></i>
                      <span className="mb-0">Chat Online</span>
                  </a>              
                </div> */}
                
                <div className="contact-item">
                  <a rel="nofollow" href="mailto:contactus@universitepsychocanine.com" className="item-link">
                      <i className="far fa-2x fa-envelope mr-4"></i>
                      <span className="mb-0">contactus@universitepsychocanine.com</span>
                  </a>              
                </div>
                
                <div className="contact-item">
                  <a rel="nofollow" 
                  // href="https://www.google.com/maps"
                  className="item-link">
                      <i className="fas fa-2x fa-map-marker-alt mr-4"></i>
                      <span className="mb-0">Our Location</span>
                  </a>              
                </div>
                
                <div className="contact-item">
                  <a rel="nofollow" href="tel:0100200340" className="item-link">
                      <i className="fas fa-2x fa-phone-square mr-4"></i>
                      <span className="mb-0">255-662-5566</span>
                  </a>              
                </div>
                
                {/* <div className="contact-item">&nbsp;</div> */}
            
            </div>
            
            
        </div>
        
      </div>
    </section>
  )
}

export default Contact;