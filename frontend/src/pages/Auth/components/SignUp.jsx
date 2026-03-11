import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import styles from "./Form.module.css";
import { BiEnvelope, BiLockAlt, BiUser, BiPhone } from "react-icons/bi";

function SignUp() {
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    cfpassword: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";

    if (!formData.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.mobile) newErrors.mobile = "Mobile is required";

    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    
    if (!formData.cfpassword)
      newErrors.cfpassword = "Confirm Password is required";
    else if (formData.password !== formData.cfpassword)
      newErrors.cfpassword = "Passwords do not match";

    if (!acceptedTerms) {
      newErrors.terms = "You must agree to the Terms and Privacy Policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await registerUser(formData);
      toast.success(response);
      navigate("/app");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        cfpassword: "",
      });
    } catch (error) {
      toast.error(error.message || "Please try again later");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        cfpassword: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Name</label>
        <div className={styles.inputWrapper}>
          <BiUser className={styles.inputIcon} size="2.2rem" />
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <span className={styles.error}>{errors.name}</span>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Email</label>
        <div className={styles.inputWrapper}>
          <BiEnvelope className={styles.inputIcon} size="2.2rem" />
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <span className={styles.error}>{errors.email}</span>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Mobile No.</label>
        <div className={styles.inputWrapper}>
          <BiPhone className={styles.inputIcon} size="2.2rem" />
          <input
            type="tel"
            placeholder="Enter your mobile number"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>
        <span className={styles.error}>{errors.mobile}</span>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Password</label>
        <div className={styles.inputWrapper}>
          <BiLockAlt className={styles.inputIcon} size="2.2rem" />
          <input
            type="password"
            placeholder="Create a password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <span className={styles.error}>{errors.password}</span>
      </div>
      
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Confirm Password</label>
        <div className={styles.inputWrapper}>
          <BiLockAlt className={styles.inputIcon} size="2.2rem" />
          <input
            type="password"
            placeholder="Confirm your password"
            name="cfpassword"
            value={formData.cfpassword}
            onChange={handleChange}
          />
        </div>
        <span className={styles.error}>{errors.cfpassword}</span>
      </div>

      <div className={styles.checkboxContainer}>
        <input 
          type="checkbox" 
          checked={acceptedTerms} 
          onChange={(e) => setAcceptedTerms(e.target.checked)} 
        />
        <label>I agree to the <span>Terms and Privacy Policy</span></label>
      </div>
      {errors.terms && <span className={styles.error}>{errors.terms}</span>}

      <button type="submit" className={styles.btn} disabled={isLoading}>
        {isLoading ? "Loading..." : "Continue"}
      </button>
    </form>
  );
}

export default SignUp;
