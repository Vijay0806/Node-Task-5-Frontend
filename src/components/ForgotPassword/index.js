import { useState } from "react";
import axios from "axios";
import "./styles.css";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `https://nodetask-05-passward-reset-backend-vj-08.onrender.com/api/password-reset`;
			const { data } = await axios.post(url, { email });
			setMsg(data.message);
			setError("");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};

	return (
		<div className="container">
			<form className="styles.form_container" onSubmit={handleSubmit}>
				<h1>Reset Password</h1>
				<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
					className="input"
				/>
				{error && <div className="error_msg">{error}</div>}
				{msg && <div className="success_msg">{msg}</div>}
				<button type="submit" className="green_btn">
					Submit
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
