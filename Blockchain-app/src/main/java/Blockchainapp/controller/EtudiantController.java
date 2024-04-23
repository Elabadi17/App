package Blockchainapp.controller;

import Blockchainapp.entity.EtudiantMetadata;
import Blockchainapp.repository.EtudiantMetadataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EtudiantController {
    @Autowired
    private EtudiantMetadataRepository etudiantMetadataRepository;

    @PostMapping("/enregistrer-metadata")
    public void enregistrerMetadata(@RequestBody EtudiantMetadata etudiantMetadata) {
        etudiantMetadataRepository.save(etudiantMetadata);
    }

    @GetMapping("/etudiants")
    public List<EtudiantMetadata> getAllEtudiants() {
        return etudiantMetadataRepository.findAll();
    }

    @DeleteMapping("/etudiants/{id}")
    public void supprimerEtudiant(@PathVariable Long id) {
        etudiantMetadataRepository.deleteById(id);
    }
}
