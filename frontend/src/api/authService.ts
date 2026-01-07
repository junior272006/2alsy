const API_URL = 'https://twoalsy.onrender.com/api';

export interface UserData {
    firstname: string;
    lastname: string; 
    email: string;
    phone: string;
    password: string; 
    promotion: string; 
    bio: string;
    study: string;
    job: string; 
    avatar: File | null;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    promotion: string;
    bio: string;
    study: string;
    job: string;
    avatar?: string;
}

export interface ApiResponse {
    message?: string;
    error?: string;
    token?: string;
    user?: User;
    admin?: User;
    id?: string;
    email?: string;
    product?: string;
}

//--------------CREATION USER----------------------
export const registerUser = async (userData: UserData): Promise<ApiResponse> => {
    try {
        const formData = new FormData();
        
        formData.append('firstname', userData.firstname);
        formData.append('lastname', userData.lastname);
        formData.append('email', userData.email);
        formData.append('phone', userData.phone);
        formData.append('password', userData.password);
        formData.append('promotion', userData.promotion);
        formData.append('bio', userData.bio);
        formData.append('study', userData.study);
        formData.append('job', userData.job);
        
        if (userData.avatar) {
            formData.append('avatar', userData.avatar);
        }

        console.log(' Envoi vers:', `${API_URL}/user/signup`);

        const response = await fetch(`${API_URL}/user/signup`, {
            method: 'POST',
            body: formData,
        });

        const data: ApiResponse = await response.json();
        console.log(' Réponse:', data);

        if (!response.ok) {
            throw new Error(data.error || data.message || 'Erreur lors de l\'inscription');
        }

        return data;

    } catch (error: any) {
        console.error(' Erreur registerUser:', error);
        throw error; //  Uniformisé avec loginUser
    }
};

//---------CONNEXION USER--------------------
export const loginUser = async (loginData: LoginData): Promise<ApiResponse> => {
    try {
        const response = await fetch(`${API_URL}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        });

        const data: ApiResponse = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.message || 'Erreur lors de la connexion');
        }

        // Stocker le token si présent
        if (data.token) {
            localStorage.setItem('authToken', data.token);
        }

        return data;

    } catch (error: any) {
        console.error(' Erreur loginUser:', error);
        
        // Gestion erreur réseau
        if (error.message === 'Failed to fetch') {
            throw new Error('Impossible de contacter le serveur');
        }
        
        throw error;
    }
};

//---------DECONNEXION USER--------------------
export const logoutUser = (): void => {
    localStorage.removeItem('authToken');
};

//---------RECUPERER TOKEN--------------------
export const getAuthToken = (): string | null => {
    return localStorage.getItem('authToken');
};