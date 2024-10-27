export const formatUserRole = (role?: string) => {
  if (role === 'USER') {
    return 'Пользователь';
  }
  if (role === 'ADMIN') {
    return 'Администратор';
  }
};
