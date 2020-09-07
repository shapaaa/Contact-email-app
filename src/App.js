import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';

const Label = styled.label`
	padding: 5px 0;
	color: white;
`;
const Header = styled.header`
	padding: 20px 0;
	font-weight: bold;
	font-size: 2rem;
	color: white;
`;
const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const Input = styled.input`
	width: 400px;
`;
const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
`;
const Textarea = styled.textarea`
	width: 408px;
	resize: none;
	border-radius: 3px;
	border: none;
	font-weight: 500;
	font-size: 14px;
	padding: 5px 5px;
`;
const Container = styled.div`
	display: flex;
	margin: 0;
	padding: 0;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;
const Button = styled.button`
	padding: 8px 15px;
	border-radius: 3px;
	margin-top: 10px;
	align-self: flex-start;
	background-color: orange;
	border: none;
	cursor: pointer;
`;
const Message = styled.p`
	color: green;
	${(props) =>
		!props.boolean &&
		css`
			color: red;
		`}
`;
function App() {
	const [state, setState] = useState({ email: '', name: '', subject: '', message: '' });
	const [result, setResult] = useState(null);
	const onInputChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};
	const sendEmail = (e) => {
		e.preventDefault();
		axios
			.post('/send', { ...state })
			.then((response) => {
				setResult(response.data);
				console.log(result + ' ' + response.data);
				setState({ email: '', name: '', subject: '', message: '' });
			})
			.catch((error) => {
				setResult({ success: false, message: `Something went wrong. Try again later ${error}` });
			});
	};
	return (
		<Container>
			{result && <Message boolean={result.success}>{result.message}</Message>}
			<Header>Enquiry Form</Header>
			<Form onSubmit={sendEmail}>
				<InputContainer>
					<Label>Full Name</Label>
					<Input
						value={state.name}
						onChange={onInputChange}
						type='text'
						name='name'
						placeholder='Enter your full name'
					/>
				</InputContainer>
				<InputContainer>
					<Label>Email</Label>
					<Input
						value={state.email}
						onChange={onInputChange}
						placeholder='Enter Email'
						type='email'
						name='email'
					/>
				</InputContainer>
				<InputContainer>
					<Label>Subject</Label>
					<Input
						value={state.subject}
						onChange={onInputChange}
						placeholder='Enter Subject'
						type='text'
						name='subject'
					/>
				</InputContainer>
				<InputContainer>
					<Label>Message</Label>
					<Textarea
						value={state.message}
						name='message'
						onChange={onInputChange}
						rows='4'
						placeholder='Enter your message'
					/>
				</InputContainer>
				<Button variant='submit' type='submit'>
					Submit
				</Button>
			</Form>
		</Container>
	);
}

export default App;
