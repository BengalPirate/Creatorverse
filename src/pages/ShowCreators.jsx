import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import Card from '../components/Card';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCreators(data || []);
      } catch (error) {
        console.error('Error fetching creators:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <>
      <div className="hero-banner">
        <h1>Creatorverse</h1>
        <p>Discover and share amazing content creators</p>
      </div>
      <div className="container">
        <header>
          <Link to="/new" className="button primary">
            Add New Creator
          </Link>
        </header>
      
      {creators.length === 0 ? (
        <div className="empty-state">
          <p>No creators yet. Add your first creator!</p>
        </div>
      ) : (
        <div className="creators-grid">
          {creators.map((creator) => (
            <Card key={creator.id} {...creator} />
          ))}
        </div>
      )}
      </div>
    </>
  );
};

export default ShowCreators;