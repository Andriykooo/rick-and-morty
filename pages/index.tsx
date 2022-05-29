import React, { FC } from 'react';

import Head from 'next/head';
import Link from 'next/dist/client/link';

import styles from '../styles/Home.module.css';

import CharactersList from '../src/components/CharactersList/CharactersList';
import CharactersPagination from '../src/components/CharactersPagination';
import CharactersSearch from '../src/components/CharactersSearch';

import { loadData } from '../src/api/Characters/CharactersReposittory';
import { GetServerSideProps } from 'next';
import { CharacterSchema } from '../src/api/Schemas/CharactersSchema';
import { CharactersPageInfoSchema } from '../src/api/Schemas/CharactersPageInfoSchema';

interface HomeProps {
  characters: CharacterSchema[];
  pagesInfo: CharactersPageInfoSchema;
}

const Home: FC<HomeProps> = ({ characters, pagesInfo }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Rick and Morty</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <CharactersSearch />
        <Link href='/favourite'>
          <a className={styles.button}>Favourite</a>
        </Link>
        <CharactersList characters={characters} />
        <CharactersPagination pagesInfo={pagesInfo} />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const characters = await loadData.getPageOfCharacters();
    const pagesInfo = await loadData.getCharacterPageInfo();

    if (!characters) {
      return {
        notFound: true,
      };
    }

    return { props: { characters, pagesInfo } };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default Home;