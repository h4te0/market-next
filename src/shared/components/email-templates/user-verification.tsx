interface Props {
  code: string;
}

export const UserVerificationTemplate = ({ code }: Props) => {
  return (
    <div>
      <h1>
        Код подтверждения: <h2>{code}</h2>
      </h1>

      <p>
        Или перейдите
        <a href={`${process.env.BASE_URL}/api/auth/verify?code=${code}`}> по ссылке</a> чтобы
        подтвердить почту.
      </p>
      <hr />
      <p>После подтверждения почты вам нужно будет повторно авторизоваться.</p>
    </div>
  );
};
