// contants
const TOKEN_SECRET_HASH = 'qwerty';

const createToken = (email, password) => btoa(
  JSON.stringify({
    email,
    password,
  }).concat(`::${TOKEN_SECRET_HASH}`)
);

const parseToken = (token) => {
  const [user, secret] = atob(token).split('::');

  return { user: JSON.parse(user), secret };
};

export const authenticateUser = (email, password) => {
  if (Math.random() > 0.5) {
    return Promise.resolve(
      new Response(
        JSON.stringify({ email, token: createToken(email, password) })
      ),
      { status: 200 }
    );
  }

  return Promise.reject(
    new Response(
      JSON.stringify({ error: true, message: 'Email or password is incorrect' }),
      { status: 401 }
    )
  )
}

export const validateToken = (token) => Promise
  .resolve(token)
  .then(parseToken)
  .then(({ secret }) => secret.includes(TOKEN_SECRET_HASH));

export const getUser = (token) => Promise
  .resolve(token)
  .then(parseToken)
  .then(({ user }) => {
    delete user.password;

    return user;
  });

export const getFlights = (token) => validateToken(token)
  .then(
    isValid => isValid
      ? new Response(
        JSON.stringify({
          data: {
            10: {
              company: {
                alternativeNames: ['Fdhjhf', 'арорва', 'АРОРВА'],
                name: 'Аврора',
              },
              date: '25-05-2021'
            },
            20: {
              company: {
                alternativeNames: [],
                name: 'Аэрофлот',
              },
              date: '29-05-2021'
            },
          }
        }),
        { status: 200 }
      )
      : new Response(
        JSON.stringify({ error: true, message: 'Forbidden' }),
        { status: 403 }
      )
  )