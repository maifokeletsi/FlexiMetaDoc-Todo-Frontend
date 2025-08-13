import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Signup } from './components/signup/signup';
import { Signin } from './components/signin/signin';
import { TodoComponent } from './components/todo/todo';

export const routes: Routes = [
    {
    path: '',
    component: Home,
    },

    {
    path: 'signup',
    component: Signup,
    },

    {
    path: 'signin',
    component: Signin,
    },

    {
    path: 'todo',
    component: TodoComponent,
    },
];
