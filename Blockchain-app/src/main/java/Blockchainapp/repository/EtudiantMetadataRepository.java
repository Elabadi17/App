package Blockchainapp.repository;

import Blockchainapp.entity.EtudiantMetadata;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EtudiantMetadataRepository extends JpaRepository<EtudiantMetadata, Integer> {
    void deleteById(Long id);
}
