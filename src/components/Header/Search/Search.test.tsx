// @vitest-environment jsdom
// import userEvent from '@testing-library/user-event';
import {screen, render} from '@testing-library/react';
import React from 'react';
import Search from './Search';
import {describe, expect, it} from 'vitest';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {userEvent} from '@testing-library/user-event';
import {Provider} from "react-redux";
import {setupStore} from "../../../store/store";

describe('Search test', () => {
    it('Input and button rendered', () => {
        render(
            <MemoryRouter>
                <Provider store={setupStore()}>
                    <Search/>
                </Provider>
            </MemoryRouter>
        );
        const input = screen.getByTestId('search-input');
        const button = screen.getByTestId('search-button');

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it('Click on the Search button saves the entered value to the local storage', async () => {

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={
                        <Provider store={setupStore()}>
                            <Search/>
                        </Provider>
                    }/>
                </Routes>
            </MemoryRouter>
        );


        const input = await screen.findByTestId('search-input');
        const button = await screen.findByTestId('search-button');

        await userEvent.type(input, 'test');
        await userEvent.click(button);
        expect(localStorage.getItem('request')).toBe('test');
    });
});
