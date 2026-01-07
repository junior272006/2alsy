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

export interface ApiResponse {
    message?: string;
    error?: string;
    token?: string;
    user?: any;
    admin?: any;
    id?: string;
    email?: string;
    product?: string;
}

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

        // LOG pour déboguer
        console.log(' Envoi vers:', `${API_URL}/user/signup`);
        console.log(' FormData:', Array.from(formData.entries()));

        const response = await fetch(`${API_URL}/user/signup`, {
            method: 'POST',
            body: formData,
        });

        const data: ApiResponse = await response.json();
        console.log(' Réponse:', data);

        if (!response.ok) {
            throw new Error(data.error || 'Erreur lors de l\'inscription');
        }

        return data;

    } catch (error) {
        console.error(' Erreur:', error);
        
        if (error instanceof Error) {
            return { error: error.message };
        }
        
        return { error: 'Une erreur inattendue s\'est produite' };
    }
};