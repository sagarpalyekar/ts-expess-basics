import { Request, Response } from 'express';
import { get, controller, post, bodyValidator } from './decorators';

// interface RequestWithBody extends Request {
//   body: { [key: string]: string | undefined };
// }

@controller('/auth')
class LoginController {
  // @get('/')
  // add(a: number, b: number): number {
  //   return a + b;
  // }

  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email && password && email === 'test@test.com' && password === 'pass') {
      req.session = { loggedIn: true };
      res.redirect('/');
      res.send({ email: email.toUpperCase(), password });
    } else {
      res.status(422).send(`
      <div>
        <div>You must provide an email</div>
        <a href="/auth/logout">Logout</a>
      </div>
    `);
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}
