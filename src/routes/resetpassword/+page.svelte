<script lang="ts">
    import {goto} from '$app/navigation';
    import {fade} from 'svelte/transition';
    import InputText from '../../components/InputText.svelte';
    import {apiCall} from '../../utils/api-call';

    const onSubmit = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        try {
            const user = {
                email: formData.get('email') as string
            };
            const response = await apiCall(
                '/api/reset-password',
                'post',
                'Password inviata',
                JSON.stringify(user)
            );
//TODO modal per response
           console.log(response);
        } catch (error: unknown) {
            console.error(error);
        }
    };

</script>
<svelte:head>
    <title>Recupero password</title>
    <meta name="description" content="Recupero password" />
</svelte:head>
<div class="background-login bg-container pb-[15rem]" transition:fade>
    <form on:submit|preventDefault={onSubmit} class="flex flex-col gap-8 px-4">
        <div class="flex flex-col gap-1">
            <h2 class="text-2xl">Recupero password!</h2>
            <p class="text-md font-light ">
                Inserisci l’email scelta in fase di registrazione.Riceverai una password di accesso temporanea,
            </p>
        </div>
        <div class="grid grid-cols-1  gap-8 md:grid-cols-3">
            <InputText
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required={true}
                    value=""
            />
        </div>
        <div class="grid grid-cols-1  gap-8 md:grid-cols-3">
            <button class="btn-primary btn-sm btn capitalize" type="submit">Invia</button>
        </div>

    </form>
</div>

<style>
    .background-login {
        background-image: url('/backgrounds/login.svg');
    }
</style>