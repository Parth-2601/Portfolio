import { useState } from "react";
import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus("Email sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send email: " + result.error);
      }
    } catch (error) {
      setStatus("Error sending email: " + error.message);
    }
  };

  return (
    <section id="contact" className={styles.container}>
      <div className={styles.leftSection}>
        <h2>Contact</h2>
        <p>Feel free to reach out!</p>
        <ul className={styles.links}>
          <li>
            <a href="mailto:pmp020601@gmail.com">
              <img src={getImageUrl("contact/emailIcon.png")} alt="Email icon" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/parthkumar-patel-44709224a">
              <img src={getImageUrl("contact/linkedinIcon.png")} alt="LinkedIn icon" />
            </a>
          </li>
          <li>
            <a href="https://github.com/Parth-2601">
              <img src={getImageUrl("contact/githubIcon.png")} alt="Github icon" />
            </a>
          </li>
        </ul>
      </div>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <h3>Send a Message</h3>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};
