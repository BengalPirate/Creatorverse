import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setCreator(data);
      } catch (error) {
        console.error('Error fetching creator:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [id]);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!creator) {
    return (
      <div className="container">
        <p>Creator not found.</p>
        <Link to="/" className="button">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/" className="button secondary">← Back</Link>
      
      <article className="creator-details">
        {creator.imageURL && (
          <img src={creator.imageURL} alt={creator.name} className="creator-image" />
        )}
        
        <h1>{creator.name}</h1>
        <p className="description">{creator.description}</p>
        
        <div className="actions">
          <a 
            href={creator.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="button primary"
          >
            Visit Channel
          </a>
          <Link to={`/edit/${creator.id}`} className="button">
            Edit Creator
          </Link>
        </div>
      </article>
    </div>
  );
};

export default ViewCreator;