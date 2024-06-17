import { jwtDecode } from "jwt-decode";

class Token {
    get(): string | null {
        return localStorage.getItem('token');
    }

    getPublic(): string | undefined {
        return process.env.REACT_APP_JWT_SECRET;
    }

    json(): any | null | false {
        return this.decode(localStorage.getItem('token') || '');
    }

    decode(token: string): any | null | false {
        try {
            return jwtDecode(token) as any | null;
        } catch (e) {
            return false;
        }
    }

    set(token: string): void {
        localStorage.setItem('token', token);
    }

    check(): any | false {
        let token = this.get();

        if (!token) return false;

        let response = this.decode(token);

        if (!response) {
            this.destroy();
            return false;
        }

        if (response.exp && response.exp <= (new Date().getTime()) / 1000) {
            this.destroy();
            return false;
        }

        return response;
    }

    destroy(): void {
        localStorage.removeItem('token');
    }
}

export default new Token();
