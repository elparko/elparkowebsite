export default function SupportEmail({ email }) {
  return <a href={`mailto:${email}`}>{email}</a>;
}
