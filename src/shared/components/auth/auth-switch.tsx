interface Props {
  type: 'login' | 'register';
  onSwitchType: () => void;
}

export const AuthSwitch = ({ type, onSwitchType }: Props) => {
  return (
    <div className="text-sm text-center">
      {type === 'login' ? (
        <p>
          Нет аккаунта?{' '}
          <span
            className="text-secondary cursor-pointer hover:opacity-70 duration-300 ease-in-out"
            onClick={onSwitchType}>
            Зарегистрируйтесь.
          </span>
        </p>
      ) : (
        <p>
          Уже есть аккаунт?{' '}
          <span
            className="text-secondary cursor-pointer hover:opacity-70 duration-300 ease-in-out"
            onClick={onSwitchType}>
            Войдите.
          </span>
        </p>
      )}
    </div>
  );
};
