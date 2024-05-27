import { useState } from "react";

const defaultCOntactFormDate = {
  username: "",
  email: "",
  message: "",
};
const Contact = () => {
  const [contact, setContact] = useState(defaultCOntactFormDate);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });

    // another way of doing the same
    // setContact((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contact);
  };
  return (
    <>
      <section className="section-contact">
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img
              src="/images/support.png"
              alt="we are always ready to help"
              height="500"
              width="500"
            />
          </div>

          {/* contact form content actual  */}
          <section className="section-form">
            <h1 className="main-heading ">Contact Us</h1>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.735601185169!2d88.36843367515006!3d22.551575079506645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277d4007c9afd%3A0x6b54f4ada3666484!2sExide%20Battery%20Factory!5e0!3m2!1sen!2sin!4v1716803843244!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};
export default Contact;
